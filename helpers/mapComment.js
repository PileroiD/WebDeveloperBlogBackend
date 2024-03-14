export default function (comment) {
    return {
        id: comment._id,
        author: comment.author?.login,
        content: comment.content,
        publishedAt: comment.createdAt,
    };
}
