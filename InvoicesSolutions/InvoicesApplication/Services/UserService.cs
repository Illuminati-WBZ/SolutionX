using InvoicesApplication.Configurations;
using InvoicesApplication.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace InvoicesApplication.Services
{
    public class UserService
    {
        private readonly IMongoCollection<User> _usersCollection;
        public UserService(IOptions<DatabaseSettings> DatabaseSettings)
        {
            var mongoClient = new MongoClient(
            DatabaseSettings.Value.ConnectionString);

            var mongoDatabase = mongoClient.GetDatabase(
                DatabaseSettings.Value.DatabaseName);

            _usersCollection = mongoDatabase.GetCollection<User>(
                DatabaseSettings.Value.UsersCollectionName);
        }

        public async Task<List<User>> GetAsync() =>
       await _usersCollection.Find(b => true).ToListAsync();

        public async Task<User?> GetAsync(string id) =>
            await _usersCollection.Find(x => x.Id == id).FirstOrDefaultAsync();


        public async Task<User> GetUser(string email,string password) => await _usersCollection.Find(x => x.Email == email && x.Password == password).FirstOrDefaultAsync();

        public async Task CreateAsync(User newUser) =>
            await _usersCollection.InsertOneAsync(newUser);

        public async Task UpdateAsync(string id, User updatedUser) =>
            await _usersCollection.ReplaceOneAsync(x => x.Id == id, updatedUser);

        public async Task RemoveAsync(string id) =>
            await _usersCollection.DeleteOneAsync(x => x.Id == id);


    }
}
