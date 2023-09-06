using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace InvoicesApplication.Models
{
    public class Vendor
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("vendorName")]
        [BsonRequired]
        public string Username { get; set; } = string.Empty;
    }
}
