import { NextResponse } from "next/server";

export type ApiSuccessResponse<T> = {
  success: true;
  data: T;
};

export type ValidationErrorBody = {
  type: "VALIDATION_ERROR";
  message: string;
  issues: Array<unknown>;
};

export type ServerErrorBody = {
  type: "SERVER_ERROR";
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  error: ValidationErrorBody | ServerErrorBody;
};

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export function successResponse<T>(data: T, status = 200) {
  return NextResponse.json<ApiSuccessResponse<T>>(
    {
      success: true,
      data,
    },
    { status }
  );
}

export function validationErrorResponse(
  issues: Array<unknown>,
  message = "Validation failed",
  status = 400
) {
  return NextResponse.json<ApiErrorResponse>(
    {
      success: false,
      error: {
        type: "VALIDATION_ERROR",
        message,
        issues,
      },
    },
    { status }
  );
}

export function serverErrorResponse(
  message = "Server error",
  status = 500
) {
  return NextResponse.json<ApiErrorResponse>(
    {
      success: false,
      error: {
        type: "SERVER_ERROR",
        message,
      },
    },
    { status }
  );
}
