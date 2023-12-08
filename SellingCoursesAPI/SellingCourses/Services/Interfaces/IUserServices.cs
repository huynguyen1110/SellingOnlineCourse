using SellingCourses.Dtos.User;

namespace SellingCourses.Services.Interfaces
{
    public interface IUserServices
    {
        void Create(CreateUserDto input);
        string Login(LoginDto input);
        GetUserDto GetUserByEmail(string email);
        UpdateUserDto UpdateUserByEmail(UpdateUserDto input, string email);
        string ForgotPassword(string email);
        bool ChangePassword(ChangePasswordDto input);
        GetUserDto GetCurrentUser();
        List<GetUserDto> GetAllUser(int idRole);
    }
}
