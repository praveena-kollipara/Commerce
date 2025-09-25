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

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var products = await dbcontext.Products.ToListAsync();
            return Ok(products);
        }
    }
}
