using InvoicesApplication.Configurations;
using InvoicesApplication.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace InvoicesApplication.Services
{
    public class VendorService
    {
        private readonly IMongoCollection<Vendor> _vendorsCollection;
        
        public VendorService(IOptions<DatabaseSettings> DatabaseSettings)
        {
            var mongoClient = new MongoClient(
            DatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                DatabaseSettings.Value.DatabaseName);

            _vendorsCollection = mongoDatabase.GetCollection<Vendor>(
                DatabaseSettings.Value.VendorsCollectionName);

        }
            // get all vendors
        public async Task<List<Vendor>> GetAsync() =>
     await _vendorsCollection.Find(b => true).ToListAsync();

        // get specific vendor
        public async Task<Vendor?> GetAsync(string username) =>
          await _vendorsCollection.Find(x => x.Username == username).FirstOrDefaultAsync();

        // post vendor
        public async Task CreateAsync(Vendor newVendor) =>
           await _vendorsCollection.InsertOneAsync(newVendor);


    }
}
