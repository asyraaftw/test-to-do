using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller;

[ApiController]
[Route("api/[controller]")]
public class ExampleController : ControllerBase
{
    [HttpGet("hello")]
    public string GetHello()
    {
        return "Hello, world!";
    }
}
