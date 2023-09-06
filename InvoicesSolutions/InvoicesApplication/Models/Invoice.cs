using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson;

namespace InvoicesApplication.Models
{
    public class Invoice
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        [BsonElement("userName")]
        [BsonRequired]
        public string Username { get; set; } = string.Empty;

        [BsonElement("selectedFile")]
        [BsonRequired]
        public string File { get; set; } = string.Empty;


        [BsonElement("vendor")]
        [BsonRequired]
        public string Vendor { get; set; } = string.Empty;

        [BsonElement("issueDate")]
        [BsonRequired]
        public DateOnly IssueDate { get; set; }

        [BsonElement("dueDate")]
        [BsonRequired]
        public DateOnly DueDate { get; set; }


        [BsonElement("amount")]
        [BsonRequired]
        public string Amount { get; set; } = string.Empty;

        [BsonElement("status")]
        public string Status { get; set; } = "In Progress";


        [BsonElement("existingVendor")]
        [BsonRequired]
        public bool ExistingVendor { get; set; }


        [BsonElement("requestAt")]
        public DateTime RequestAt { get; set; } = DateTime.Now;


    }
}
