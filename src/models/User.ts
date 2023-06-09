type User = {
    uid?: string,
    email: string,
    password: string,
    name: string,
    created: Date,
    modified?: Date,
    deleted?: Date,
    accessToken?: string,
}

export default User;