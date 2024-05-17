import argon2 from 'argon2'


export const hashPassword = async(password) => {
    try {
        const hash = await argon2.hash(password)
        return hash
    } catch (err) {
        console.log(err)
    }
}

export const verifyPassword = async(hash, password) => {

    try {
    const match = await argon2.verify(hash, password)
        return match
    } catch (err) {
        console.log(err)
    }
}

