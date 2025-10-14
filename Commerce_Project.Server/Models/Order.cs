using System;
using System.Collections.Generic;

namespace Commerce_Project.Server.Models;

public partial class Order
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public DateTime? OrderDate { get; set; }
}
