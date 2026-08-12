//FOR DEVELOPMENT ONLY
db.createUser({
    user: "devUser",
    pwd: "devPassword",
    roles: [
        {
            role: "readWrite",
            db: "projects",
        },
    ],
});
