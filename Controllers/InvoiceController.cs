using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ReactCore.Model;
using ReactCore.DataAccess;

namespace ReactCore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        [HttpGet]
        [Route("GetInvoice")]
        public IActionResult GetInvoiceItems()
        {
            var dataList = Repository.Items;
            return Ok(dataList);
        }
    }
}