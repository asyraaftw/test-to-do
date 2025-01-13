using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Model;
using Backend.Data;

namespace Backend.Controller
{
    [Route("api/[controller]")]
    [ApiController]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TasksController(AppDbContext context)
        {
            _context = context;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Backend.Model.Task>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Backend.Model.Task>> GetTask(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        
        [HttpPost]
        public async Task<ActionResult<Backend.Model.Task>> CreateTask(Backend.Model.Task task)
        {
            task.createdTs = DateTime.UtcNow; 
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { id = task.id }, task);
        }

        
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(Guid id, Backend.Model.Task task)
        {
            if (id != task.id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(Guid id)
        {
            var task = await _context.Tasks.FindAsync(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(Guid id)
        {
            return _context.Tasks.Any(e => e.id == id);
        }

        public class ApiResponse
        {
            public bool Success { get; set; }
            public string? Message { get; set; }
        }

        [HttpGet("existTask/{id}")]
        public IActionResult CheckTaskExistence(Guid id)
        {
        var taskExists = _context.Tasks.Any(t => t.id == id);
        var response = new ApiResponse
        {
            Success = taskExists,
                Message = taskExists ? "Task found." : "Task not found."
            };

            return Ok(response);
        }

    }
}
