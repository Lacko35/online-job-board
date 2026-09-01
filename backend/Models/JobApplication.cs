using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class JobApplication
    {
        [Key]
        public int ID { get; set; }

        public DateTime AppliedDate { get; set; }

        public required string Status { get; set; }

        public Worker? Worker { get; set; }

        public List<JobPosting> Postings { get; set; } = new();
    }
}