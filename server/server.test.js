const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('./server'); // Import the Express app
const Data = require('./models/data'); // Import the Data model
const express = require('express')

let mongoServer;

beforeAll (async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
}
);
afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
}); 
afterEach(async () => {
    await Data.deleteMany({}); // Clear the database after each test
} );

describe('POST /add-comment', () => {
   it("should save comment to database", async () => {
        const res = await request(app)
        .post('/add-comment')
        .send({
            title: "title",
            description:"description",
            email: "email"
        })
        .catch((err) => {
            console.error("Save error:", err);
            res.status(500).send("Failed to save comment.");
        });
        
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe("Comment submitted successfully!");

        const saved = await Data.findOne({});
        expect(saved).not.toBeNull();
        expect(saved.title).toBe("title");
        expect(saved.description).toBe("description");
        expect(saved.email).toBe("email");
    });

    it("should sanitise special characters before saving to database", async () => {
        const res = await request(app)
        .post('/add-comment')
        .send({
            title: "title\"'`;/-\\",
            description:"description\"'`;/-\\",
            email: "email\"'`;/-\\"
        })
        .catch((err) => {
            console.error("Save error:", err);
            res.status(500).send("Failed to save comment.");
        });
        
        
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe("Comment submitted successfully!");

        const saved = await Data.findOne({});
        expect(saved).not.toBeNull();
        expect(saved.title).toBe("title");
        expect(saved.description).toBe("description");
        expect(saved.email).toBe("email");
    })

    it("should not save comment if title is too long", async () => {
        const res = await request(app)
        .post('/add-comment')
        .send({
            title: "a".repeat(101), 
            description:"description",
            email: "email"
        })
        .catch((err) => {
            console.error("Save error:", err);
            res.status(500).send("Failed to save comment.");
        });
        
        expect(res.statusCode).toEqual(400);
        expect(res.text).toBe("Title, description, or email is too long.");
    });
    it("should not save comment if description is too long", async () => {
        const res = await request(app)
        .post('/add-comment')
        .send({
            title: "title",
            description:"a".repeat(501), // 501 characters
            email: "email"
        })
        .catch((err) => {
            console.error("Save error:", err);
            res.status(500).send("Failed to save comment.");
        });
        
        expect(res.statusCode).toEqual(400);
        expect(res.text).toBe("Title, description, or email is too long.");
    });
    it("should not save comment if email is too long", async () => {
        const res = await request(app)
        .post('/add-comment')
        .send({
            title: "title",
            description:"description",
            email: "a".repeat(101)
        })
        .catch((err) => {
            console.error("Save error:", err);
            res.status(500).send("Failed to save comment.");
        });
        
        expect(res.statusCode).toEqual(400);
        expect(res.text).toBe("Title, description, or email is too long.");
    });
});