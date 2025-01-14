using Microsoft.AspNetCore.Mvc;

namespace Backend.Controller;

// Default
[ApiController]
[Route("api")]
public class ExampleController : ControllerBase
{
    public string Index()
    {
        return "Hello, world!";
    }
}
