namespace InvoicesApplication.Configurations
{
    public class DatabaseSettings
    {
        public string ConnectionString { get; set; } = null!;

        public string DatabaseName { get; set; } = null!;

        public string UsersCollectionName { get; set; } = null!;
        public string VendorsCollectionName { get; set; } = null!;

        public string InvoicesCollectionName { get; set; } = null!;
        
    }
}
