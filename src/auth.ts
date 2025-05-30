function adminAuthRegister(email: string, password: string, nameFirst: string, nameLast: string) {
    return {
        authUserId: 1
    }
}

function adminAuthLogin(email: string, password: string) {
    return {
        authUserId: 1
    }
}

function adminUserDetails(authUserId: number) {
    return {
        user: {
                userId: 1,
                name: "Cormie Flakes",
                email: "haydenFUUU@gmail.com",
                numSuccessfulLogins: 3,
                numFailedPasswordsSinceLastLogin: 1
        }
    }
}

function adminUserDetailsUpdate(authUserId: number, email: string, nameFirst: string) {
    return { }
}

function adminUserPasswordUpdate(authUserId: number, oldPassword: string, newPassword: string) {
    return { }
}

function adminTimerUpdate(authUserID: number) {
    return { }
}

function adminUpdateAchievements(authUserId: number) {
    return { }
}

function adminUpdateDailyStreak(authUserId: number) {
    return { }
}

function adminAddFriend(authUserId: number) {
    return { }
}

function adminRemoveFriend(authUserId: number) {
    return { }
}

function adminUpdateBalance(authUserId: number, amount: number) {
    return { }
}

export {
    adminAuthRegister,
    adminUserDetails,
    adminAuthLogin
}