namespace backend.Models
{
    public class Worker : User
    {
        public string? FullName { get; set; }

        public string? Username { get; set; }

        public string? JobTitle { get; set; }

        public List<JobApplication> Applications { get; set; } = new();
    }
}