using Commerce_Project.Server.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Commerce_Project.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly CommerceDbContext dbcontext;
        public CategoryController(CommerceDbContext _context) {
            dbcontext = _context;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var categories = await dbcontext.Categories.ToListAsync();
            return Ok(categories);
        }

        [HttpGet("ListOfCategories")]
        public async Task<IActionResult> GetCategories()
        {
            var items = await dbcontext.Categories.Select(x => x.Name).ToListAsync();
            return Ok(items);
        }
        [HttpGet("ProductsBasedOnCategory/{categoryname}")]
        public async Task<IActionResult> GetProductsBasedOnCategory(string categoryname)
        {
            var record = await dbcontext.Categories.FirstOrDefaultAsync(x => x.Name == categoryname);
            if (record == null)
            {
                return NotFound();
            }
            var items = await dbcontext.Products.Where(x=>x.CategoryId == record.Id).Select(
                x => new ProductDTO
                {
                    Name = x.Name,
                    Description = x.Description,
                    Price = x.Price,
                    StockQuantity = x.StockQuantity,
                    //Brand = x.Brand,
                    //PublishedDate = x.PublishedDate,
                    //Rating = x.Rating,
                    //IsActive = x.IsActive
                }).ToListAsync();
                return Ok(items);
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Category items)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            dbcontext.Categories.Add(items);
           await  dbcontext.SaveChangesAsync();
            return Ok(new { success = true, status = 200 });
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Category items)
        {
            var item = await dbcontext.Categories.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
           // item.Id = items.Id;
            item.Name = items.Name;
            item.Description = items.Description;
            await dbcontext.SaveChangesAsync();
            return Ok(item);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var item = await dbcontext.Categories.FindAsync(id);
            if (item == null)
            {
                return NotFound();
            }
            dbcontext.Categories.Remove(item);
             dbcontext.SaveChanges();
            return Ok(item);
        }
    }
}
