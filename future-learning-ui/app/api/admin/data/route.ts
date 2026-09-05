import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getApplications, getInquiries, updateApplicationStatus } from "@/lib/applicationsStore";
import { getAllRoles } from "@/lib/rolesStore";

async function isAuthorized() {
  const cookieStore = await cookies();
  const token = cookieStore.get("kalpkrafts_admin_token");
  return token?.value === "admin_authenticated_session";
}

export async function GET() {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  const applications = getApplications();
  const inquiries = getInquiries();
  const roles = getAllRoles();

  const stats = {
    totalRoles: roles.length,
    activeRoles: roles.filter((r) => r.active !== false).length,
    totalApplications: applications.length,
    newApplications: applications.filter((a) => a.status === "New").length,
    totalInquiries: inquiries.length,
  };

  return NextResponse.json({
    success: true,
    stats,
    applications,
    inquiries,
    roles,
  });
}

export async function PUT(req: Request) {
  if (!(await isAuthorized())) {
    return NextResponse.json({ success: false, error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { id, status } = await req.json();
    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status required." }, { status: 400 });
    }

    const updated = updateApplicationStatus(id, status);
    return NextResponse.json({ success: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
