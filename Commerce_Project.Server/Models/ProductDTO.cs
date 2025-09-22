using System;
using System.Collections.Generic;

namespace Commerce_Project.Server.Models;

public partial class ProductDTO
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public decimal Price { get; set; }


    public int StockQuantity { get; set; }

    public string? Brand { get; set; }

    public DateTime? PublishedDate { get; set; }

    public decimal? Rating { get; set; }

    public bool? IsActive { get; set; }

    public virtual Category? Category { get; set; }

   
}
