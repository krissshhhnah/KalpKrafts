import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getAllRoles, getActiveRoles, addRole, updateRole, deleteRole } from "@/lib/rolesStore";

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get("kalpkrafts_admin_token");
  return token?.value === "admin_authenticated_session";
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const activeOnly = searchParams.get("activeOnly") === "true";

  if (activeOnly) {
    return NextResponse.json({ success: true, roles: getActiveRoles() });
  }

  return NextResponse.json({ success: true, roles: getAllRoles() });
}

export async function POST(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (!body.title || !body.dept) {
      return NextResponse.json({ success: false, error: "Title and Department are required." }, { status: 400 });
    }

    const created = addRole({
      title: body.title,
      dept: body.dept,
      type: body.type || "Full-Time / Internship",
      location: body.location || "Remote-Friendly",
      exp: body.exp || "Students & Professionals",
      desc: body.desc || "",
      aboutKalpKrafts: body.aboutKalpKrafts || "KalpKrafts is an AI-first EdTech research startup.",
      aboutRole: body.aboutRole || "",
      responsibilities: Array.isArray(body.responsibilities) ? body.responsibilities : [body.responsibilities].filter(Boolean),
      qualifications: Array.isArray(body.qualifications) ? body.qualifications : [body.qualifications].filter(Boolean),
      skills: Array.isArray(body.skills) ? body.skills : (body.skills || "").split(",").map((s: string) => s.trim()).filter(Boolean),
      active: true,
    });

    return NextResponse.json({ success: true, role: created });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id, ...updatedFields } = await req.json();
    if (!id) {
      return NextResponse.json({ success: false, error: "Role ID is required." }, { status: 400 });
    }

    const updated = updateRole(id, updatedFields);
    if (!updated) {
      return NextResponse.json({ success: false, error: "Role not found." }, { status: 404 });
    }

    return NextResponse.json({ success: true, role: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Role ID is required." }, { status: 400 });
    }

    const success = deleteRole(id);
    return NextResponse.json({ success });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
