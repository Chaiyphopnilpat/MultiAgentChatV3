import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Sanitization function (light version) that would be enhanced with DOMPurify in the component
export function sanitizeText(text: string): string {
  return text
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

// Mock Agent avatars and colors for UI
export const AGENTS = {
  user: { name: 'ผู้ใช้', avatar: '👤', color: 'bg-gray-100' },
  doctor: { name: 'Dr. Neuro', avatar: '🧠', color: 'bg-blue-500 text-white' },
  analyst: { name: 'Cyber Analyst', avatar: '🛡️', color: 'bg-green-500 text-white' }
};

// Agent profiles with extended information
export const AGENT_PROFILES = {
  doctor: {
    specialty: "ระบบประสาท",
    tone: "สุภาพ เป็นกันเอง",
    responseTime: "2-5 วินาที"
  },
  analyst: {
    specialty: "ความมั่นคงไซเบอร์",
    tone: "ตรงไปตรงมา",
    responseTime: "1-3 วินาที"
  }
};

// Simple NLP message router
export async function routeMessage(content: string): Promise<{
  topMatch: string;
  requiresMultiDomain: boolean;
  keywords: string[];
}> {
  // Simple mock logic to classify domain
  const lower = content.toLowerCase();
  let topMatch = 'general';
  let requiresMultiDomain = false;

  if (lower.includes('ปวดหัว') || lower.includes('เวียนหัว') || lower.includes('ระบบประสาท')) {
    topMatch = 'medical';
  } else if (lower.includes('hack') || lower.includes('cyber') || lower.includes('security')) {
    topMatch = 'cybersecurity';
  }

  // Simple logic: if contains both keywords, requiresMultiDomain for demo
  if ((lower.includes('ปวดหัว') || lower.includes('เวียนหัว')) && 
      (lower.includes('security') || lower.includes('hack') || lower.includes('cyber'))) {
    requiresMultiDomain = true;
  }

  const keywords = lower.split(' ').filter(w => w.length > 3).slice(0, 5);

  return {
    topMatch,
    requiresMultiDomain,
    keywords
  };
}

// Mock worker simulate analyzing message asynchronously
export function analyzeMessage({ text, context, agents }: { 
  text: string; 
  context: any; 
  agents: string[];
}): Promise<{ responses: any[] }> {
  return new Promise<{ responses: any[] }>((resolve) => {
    setTimeout(() => {
      // Generate responses from primary and secondary agents
      const responses = [];

      // For demo, assign doctor if medical keyword present
      if (text.includes('ปวดหัว') || text.includes('เวียนหัว')) {
        responses.push({
          role: 'doctor',
          content: 'จากอาการที่คุณแจ้งมา อาการปวดหัวและเวียนหัวอาจเกี่ยวข้องกับความเครียด การใช้สายตามากเกินไป หรือปัญหาทางระบบประสาท ขอแนะนำให้พักสายตาเป็นระยะและหากอาการไม่ดีขึ้นควรปรึกษาแพทย์',
          status: 'verified',
          timestamp: new Date().toISOString()
        });
      }

      // Add analyst response if cybersecurity keyword
      if (text.toLowerCase().includes('security') || text.toLowerCase().includes('hack')) {
        responses.push({
          role: 'analyst',
          content: 'การรักษาความปลอดภัยไซเบอร์เป็นเรื่องสำคัญ ควรตรวจสอบระบบและปรับปรุงมาตรการป้องกันเป็นประจำ รวมถึงการอัปเดตซอฟต์แวร์ให้เป็นเวอร์ชันล่าสุดเสมอ',
          status: 'verified',
          timestamp: new Date().toISOString()
        });
      }

      // If no domain matched, simple general response
      if (responses.length === 0) {
        responses.push({
          role: 'doctor',
          content: 'ขอบคุณที่ติดต่อมา คุณมีคำถามเกี่ยวกับสุขภาพหรือไม่?',
          status: 'verified',
          timestamp: new Date().toISOString()
        });
      }

      resolve({ responses });
    }, 1500); // simulate delay
  });
}
