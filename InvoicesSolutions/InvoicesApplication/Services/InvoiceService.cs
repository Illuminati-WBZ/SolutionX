using InvoicesApplication.Configurations;
using InvoicesApplication.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace InvoicesApplication.Services
{
    public class InvoiceService
    {
        private readonly IMongoCollection<Invoice> _invoiceCollection;

        public InvoiceService(IOptions<DatabaseSettings> DatabaseSettings)
        {
            var mongoClient = new MongoClient(
           DatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                DatabaseSettings.Value.DatabaseName);

            _invoiceCollection = mongoDatabase.GetCollection<Invoice>(
                DatabaseSettings.Value.InvoicesCollectionName);
        }

        public async Task<List<Invoice>> GetAsync() =>
      await _invoiceCollection.Find(i => true).ToListAsync();

        public async Task<List<Invoice>> GetAsync(string name) =>
           await _invoiceCollection.Find(x => x.Username == name || x.Vendor == name).ToListAsync();

        public async Task<Invoice?> GetIdAsync(string id) =>
            await _invoiceCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(Invoice newInvoice) =>
           await _invoiceCollection.InsertOneAsync(newInvoice);

        public async Task UpdateAsync(string id, Invoice updateInvoice) =>
           await _invoiceCollection.ReplaceOneAsync(x => x.Id == id, updateInvoice);


    }
}
