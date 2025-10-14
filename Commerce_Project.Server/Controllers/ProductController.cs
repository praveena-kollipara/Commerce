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
            //product.Category = await dbcontext.Categories.Where(x => x.Id = product.CategoryId);
            return Ok(new {data= product , success=true});
        }
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Product data)
        {
            if(!ModelState.IsValid) {
                return BadRequest(ModelState);
             }
            var item = await dbcontext.Products.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            item.Id = data.Id;
            item.Brand = data.Brand;
            item.Name = data.Name;
            item.Description = data.Description;
            item.Price = data.Price;
            item.Rating = data.Rating;
            item.StockQuantity = data.StockQuantity;
            item.IsActive = data.IsActive;


            await dbcontext.SaveChangesAsync();
            return Ok(new {data = item , success=true});

        }
    }
}
