export default function (user) {
    return {
        id: user._id,
        login: user.login,
        roleId: user.role,
        registeredAt: user.createdAt,
    };
}
