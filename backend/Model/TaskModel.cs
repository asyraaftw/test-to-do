using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model
{
    [Table("task", Schema = "public")]
    public class Task
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // uuidv4
        public Guid id { get; set; }

        [Required]
        [MaxLength(255)]
        public required string title { get; set; }

        public string? description { get; set; }

        public Guid? createdBy { get; set; }

        [Required]
        public DateTime createdTs { get; set; } = DateTime.UtcNow; // now()
    }
}
