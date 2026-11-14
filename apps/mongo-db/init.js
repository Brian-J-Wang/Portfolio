//FOR DEVELOPMENT ONLY
const projectDatabase = db.getSiblingDB("projects")

projectDatabase.createUser({
    user: "devUser",
    pwd: "devPassword",
    roles: [
        {
            role: "readWrite",
            db: "projects",
        },
    ],
});
