using InvoicesApplication.Configurations;
using InvoicesApplication.Models;
using InvoicesApplication.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
// services
builder.Services.Configure<DatabaseSettings>(
    builder.Configuration.GetSection("DBConnection"));
// collections
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<VendorService>();
builder.Services.AddSingleton<InvoiceService>();

// jwt token authorization middleware

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = false,
        ValidAudience = builder.Configuration["Jwt:Audience"],
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
        ValidateIssuerSigningKey = true
    };
});

// cors
builder.Services.AddCors();
// add authorization
builder.Services.AddAuthorization();
var app = builder.Build();
app.UseHttpsRedirection();

// Shows UseCors with CorsPolicyBuilder.
app.UseCors(builder =>
{
    builder.AllowAnyOrigin()
           .AllowAnyMethod()
           .AllowAnyHeader();
});





app.MapGet("/", () => "Hello World");

// users collection controllers api
app.MapGet("/api/users", async (UserService userService) => await userService.GetAsync()).RequireAuthorization();

app.MapPost("/api/create/users", async (UserService userService, User newUser) =>
{
       await userService.CreateAsync(newUser);
}).RequireAuthorization();



app.MapPost("/api/login", async (User user,UserService userService) =>
{

    if (user != null && user.Password != null && user.Email != null)
    {
        var user_ = await userService.GetUser(user.Email, user.Password);
        if (user_ != null)
        {
            var claims = new[]
            {
                new Claim("username",user_.Username),
                new Claim("role",user_.Role),
            };
            var issuer = builder.Configuration["Jwt:Issuer"];
            var audience = builder.Configuration["Jwt:Audience"];
            var Key = builder.Configuration["Jwt:Key"];
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Key));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
               issuer,
                audience,
                claims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: signIn);

            return Results.Ok(new JwtSecurityTokenHandler().WriteToken(token));
        }
        return Results.Unauthorized();
    }
    return Results.BadRequest();
});


app.MapGet("/api/users/id/{id}", async (UserService userService, string id) => await userService.GetAsync(id)).RequireAuthorization();

app.MapDelete("/api/users/delete/{id}", async (UserService userService, string id) => await userService.RemoveAsync(id)).RequireAuthorization();

app.MapPut("/api/users/id/{id}", async (UserService userService, string id,User newuser) => await userService.UpdateAsync(id,newuser)).RequireAuthorization();

// vendor collection controllers api

app.MapGet("/api/vendors", async (VendorService vendorService) => await vendorService.GetAsync()).RequireAuthorization();

app.MapGet("/api/vendors/{username}",async(VendorService vendorService,string username) => await vendorService.GetAsync(username)).RequireAuthorization();

app.MapPost("/api/vendors", async (VendorService vendorService, Vendor newVendor) => await vendorService.CreateAsync(newVendor)).RequireAuthorization();


// invoice collection controller api

app.MapGet("/api/invoices",async(InvoiceService invoiceService) => await invoiceService.GetAsync()).RequireAuthorization();

app.MapGet("/api/invoices/{name}", async (InvoiceService invoiceService,string name) => await invoiceService.GetAsync(name)).RequireAuthorization();

app.MapGet("/api/invoices/id/{id}", async (InvoiceService invoiceService, string id) => await invoiceService.GetIdAsync(id)).RequireAuthorization();

app.MapPost("/api/invoices",async (InvoiceService invoiceService, Invoice newInvoice) => await invoiceService.CreateAsync(newInvoice)).RequireAuthorization();

app.MapPut("/api/invoices/id/{id}", async (string id, InvoiceService invoiceService, Invoice updateInvoice) => await invoiceService.UpdateAsync(id, updateInvoice)).RequireAuthorization();



// authentication and authorization
app.UseAuthentication();
app.UseAuthorization();
app.Run();
