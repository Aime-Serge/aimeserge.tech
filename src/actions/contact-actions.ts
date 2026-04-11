"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { type ContactSubmission } from "@/types/contact";

export async function submitContactForm(formData: ContactSubmission) {
  const supabase = createServerSupabaseClient();

  try {
    const { error } = await supabase
      .from('contacts')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          contact_type: formData.contactType,
          company_name: formData.companyName,
          job_title: formData.jobTitle,
          interest: formData.interest,
          budget: formData.budget,
          timeline: formData.timeline,
          location: formData.location,
          linkedin_url: formData.linkedinUrl,
          whatsapp: formData.whatsapp,
          gender: formData.gender,
          marital_status: formData.maritalStatus,
          message: formData.message,
          newsletter_opt_in: formData.newsletterOptIn,
        }
      ]);

    if (error) {
      console.error("Supabase submission error:", error);
      return { success: false, message: "System failure during transmission. Please retry." };
    }

    return { success: true, message: "Inquiry successfully logged in the secure vault." };
  } catch (err) {
    console.error("Fatal contact submission error:", err);
    return { success: false, message: "Encryption failure during handshake." };
  }
}
