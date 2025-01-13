using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Model
{
    [Table("user", Schema = "public")]
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // Generated by the database
        public Guid id { get; set; }

        [Required]
        [MaxLength(255)] // Matches the `varchar` type
        public required string name { get; set; }

        [Required]
        public int age { get; set; }
        public string? email { get; set; }
        public string? password { get; set; }
    }
}
