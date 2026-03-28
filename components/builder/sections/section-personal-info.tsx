"use client";

import { useFormContext } from "react-hook-form";
import { FloatingInput } from "@/components/ui/floating-input";
import type { ResumeFormSchema } from "@/lib/schemas";

export function SectionPersonalInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormSchema>();

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-primary/85">
          Personal Information
        </h3>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FloatingInput
          label="First Name"
          error={errors.firstName?.message}
          {...register("firstName")}
        />
        <FloatingInput
          label="Last Name"
          error={errors.lastName?.message}
          {...register("lastName")}
        />
        <FloatingInput
          label="Headline / Role"
          error={errors.headline?.message}
          className="sm:col-span-2"
          {...register("headline")}
        />
        <FloatingInput
          label="Email"
          type="email"
          error={errors.email?.message}
          {...register("email")}
        />
        <FloatingInput
          label="Phone"
          error={errors.phone?.message}
          {...register("phone")}
        />
        <FloatingInput
          label="Location"
          error={errors.location?.message}
          {...register("location")}
        />
        <FloatingInput
          label="Portfolio URL"
          error={errors.portfolio?.message}
          {...register("portfolio")}
        />
        <FloatingInput
          label="LinkedIn URL"
          error={errors.linkedin?.message}
          {...register("linkedin")}
        />
        <FloatingInput
          label="GitHub URL"
          error={errors.github?.message}
          {...register("github")}
        />
      </div>
    </div>
  );
}
