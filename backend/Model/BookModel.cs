using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model
{
    [Table("book", Schema = "public")]
    public class Book
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // uuidv4
        public Guid id { get; set; }
        [Required]
        [MaxLength(255)]
        public required string title { get; set; }
        public int? rating { get; set; }
        public Guid? createdBy { get; set; }
        public DateTime? createdTs { get; set; } = DateTime.UtcNow; // now()
    }
}
