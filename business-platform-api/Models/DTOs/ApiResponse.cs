namespace business_platform_api.Models.DTOs;

public class ApiResponse<T>
{
    public bool IsSuccess { get; set; }
    public T? Data { get; set; }
    public string Message { get; set; } = string.Empty;

    public static ApiResponse<T> Success(T data, string message = "")
    {
        return new ApiResponse<T> { IsSuccess = true, Data = data, Message = message };
    }

    public static ApiResponse<T> Failure(string message)
    {
        return new ApiResponse<T> { IsSuccess = false, Data = default, Message = message };
    }
}
