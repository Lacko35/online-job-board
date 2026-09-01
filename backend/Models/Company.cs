namespace backend.Models
{
    public class Company : User
    {
        public string? PIB { get; set; }

        public string? CompanyName { get; set; }

        public List<JobPosting> JobPostings { get; set; } = new();
    }
}