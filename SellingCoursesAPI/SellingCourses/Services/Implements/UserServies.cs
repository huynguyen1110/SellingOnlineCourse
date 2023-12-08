using AutoMapper;
using Microsoft.IdentityModel.Tokens;
using SellingCourses.Common;
using SellingCourses.Constants;
using SellingCourses.Dtos.User;
using SellingCourses.Entities;
using SellingCourses.Services.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SellingCourses.Services.Implements
{
    public class UserServies : IUserServices
    {
        private readonly SellingCoursesDbContext _dbContext;
        private readonly IConfiguration _configuration;
        private readonly IMapper _mapper;
        private readonly IHttpContextAccessor _httpContext;
        public UserServies(SellingCoursesDbContext dbContext, IConfiguration configuration, IMapper mapper, IHttpContextAccessor httpContext)
        {
            _dbContext = dbContext;
            _configuration = configuration;
            _mapper = mapper;
            _httpContext = httpContext;
        }

        public void Create(CreateUserDto input)
        {
            if (_dbContext.Users.Any(u => u.Email == input.Email))
            {
                throw new Exception($"Tên tài khoản \"{input.Email}\" đã tồn tại");
            }
            _dbContext.Users.Add(new User
            {
                Email = input.Email,
                Password = CommonUtils.CreateMD5(input.Password),
                CreateAt = DateTime.Now,
                Deleted = false, 
                FirstName = input.FirstName, 
                IdRole = UserType.User,
                LastName = input.LastName,
                Sdt = input.Sdt,
                GioiTInh = "",
                UpdateAt = DateTime.Now,
            });
            _dbContext.SaveChanges();
        }

        public string Login(LoginDto input)
        {
            var user = _dbContext.Users.FirstOrDefault(u => u.Email == input.Email);
            if (user == null)
            {
                throw new Exception($"Tài khoản \"{input.Email}\" không tồn tại");
            }

            if (CommonUtils.CreateMD5(input.Password) == user.Password)
            {
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Name, user.Email.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email),
                    new Claim(CustomClaimRoles.UserType, user.IdRole.ToString()),
                    new Claim(CustomClaimRoles.UserId, user.Id.ToString())
                };

                var token = new JwtSecurityToken(
                    expires: DateTime.Now.AddSeconds(_configuration.GetValue<int>("JWT:Expires")),
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                );

                return new JwtSecurityTokenHandler().WriteToken(token);
            }
            else
            {
                throw new Exception($"Mật khẩu không chính xác");
            }
        }

        public GetUserDto GetUserByEmail(string email)
        {
            var UserInfo = _dbContext.Users.FirstOrDefault(userInfo =>  userInfo.Email == email);
            if (UserInfo != null)
            {
                GetUserDto userDto = _mapper.Map<GetUserDto>(UserInfo);
                return userDto;
            } else
            {
                return null;
            }
        }

        public UpdateUserDto UpdateUserByEmail(UpdateUserDto input, string email)
        {
            var UserInfo = _dbContext.Users.FirstOrDefault(user => user.Email == email);
            if (UserInfo != null)
            {
                UserInfo.FirstName = input.FirstName;
                UserInfo.LastName = input.LastName;
                UserInfo.Email = input.Email;
                UserInfo.Sdt = input.Sdt;
                UserInfo.GioiTInh = input.GioiTInh;
                UserInfo.NgayThangNamSinh = input.NgayThangNamSinh;
                UserInfo.UpdateAt = DateTime.Now;
                _dbContext.SaveChanges();
                return input;
            }
            throw null;
        }
        public string ForgotPassword(string email)
        {
            var user = _dbContext.Users.FirstOrDefault(user => user.Email == email);
            if(user != null) 
            {
                // Khai báo các ký tự cho chuỗi ngẫu nhiên
                string characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

                // Tạo đối tượng Random
                Random random = new Random();

                StringBuilder randomString = new StringBuilder();
                for (int i = 0; i < 8; i++)
                {
                    int index = random.Next(characters.Length);
                    randomString.Append(characters[index]);
                }

                string finalRandomString = randomString.ToString();

                user.Password = CommonUtils.CreateMD5(finalRandomString);
                _dbContext.SaveChanges();

                return finalRandomString;
            }

            return null;
        }

        public bool ChangePassword(ChangePasswordDto input)
        {
            var email = _httpContext.HttpContext.User.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Name);
            if(email != null)
            {
                var user = _dbContext.Users.FirstOrDefault(x => x.Email == email.Value && x.Password == CommonUtils.CreateMD5(input.Password));
                if (user != null)
                {
                    user.Password = CommonUtils.CreateMD5(input.NewPassword);
                    _dbContext.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }    
            return false;
        }

        public GetUserDto GetCurrentUser()
        {
            var email = _httpContext.HttpContext.User.Claims.First(claim => claim.Type == JwtRegisteredClaimNames.Name);
            var result = GetUserByEmail(email.Value);
            return result;
        }

        public List<GetUserDto> GetAllUser(int idRole)
        {
            var query = (from user in _dbContext.Users
                         where user.Deleted == false
                         select new GetUserDto
                         {
                             IdRole = user.IdRole,
                             Deleted = user.Deleted,
                             CreateAt = user.CreateAt,
                             Email = user.Email,
                             FirstName = user.FirstName,
                             GioiTInh = user.GioiTInh,
                             Id = user.Id,
                             LastName = user.LastName,
                             Sdt = user.Sdt,
                             UpdateAt = user.UpdateAt,
                             Verify = user.Verify
                         });
            
            if(idRole > 0)
            {
                query = query.Where(x => x.IdRole == idRole);
            }

            return query.ToList();
        }
    }
}
