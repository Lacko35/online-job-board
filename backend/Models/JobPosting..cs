namespace backend.Models
{
    public class JobPosting
    {
        public int ID { get; set; }

        public required string Title { get; set; }

        public required string Description { get; set; }

        public DateTime PostedDate { get; set; }

        public Company? Company { get; set; }

        public List<JobApplication> Applications { get; set; } = new();
    }
}