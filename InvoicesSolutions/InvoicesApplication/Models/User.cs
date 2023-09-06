using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace InvoicesApplication.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("userName")]
        [BsonRequired]
        public string Username { get; set; } = string.Empty;
        [BsonElement("emailAddress")]
        [BsonRequired]
        public string Email { get; set; } = string.Empty;
        [BsonElement("password")]
        [BsonRequired]
        public string Password { get; set; } = string.Empty;
        public string Role { get; set; } = "user";
    }
}
