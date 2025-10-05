using Commerce_Project.Server.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace Commerce_Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly CommerceDbContext dbcontext;
        public ProductController(CommerceDbContext _context)
        {
            dbcontext = _context;
        }

        [HttpGet("productById/{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await dbcontext.Products.FirstOrDefaultAsync(x=>x.Id==id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(new {data= product , success=true});
        }
    }
}
