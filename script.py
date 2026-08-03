import re

with open('admissions.html', 'r', encoding='utf-8') as f:
    content = f.read()

# We need to replace everything between <main> and </main>
main_start = content.find('<main>')
main_end = content.find('</main>')

if main_start != -1 and main_end != -1:
    new_main = '''<main>
    <!-- Admissions Hero Banner -->
    <div class="admissions-hero" style="position: relative; background: linear-gradient(145deg, #004D40 0%, #002D24 100%); padding: 100px 5%; text-align: center; overflow: hidden;">
        <div class="top-bracket" style="border-top-right-radius: 16px !important;"></div>
        <div class="bottom-bracket" style="border-bottom-left-radius: 16px !important;"></div>
        
        <h1 style="color: #FFFFFF; font-size: 3rem; font-weight: 800; margin-bottom: 20px; position: relative; z-index: 2;" data-en="Admissions Center" data-ur="مرکزِ داخلہ">Admissions Center</h1>
        <p style="color: #A3E4D7; font-size: 1.2rem; max-width: 600px; margin: 0 auto; position: relative; z-index: 2;" data-en="Join our institution and embark on a journey of profound learning and spiritual growth." data-ur="ہمارے ادارے میں شامل ہوں اور گہرے علم اور روحانی ترقی کے سفر کا آغاز کریں۔">Join our institution and embark on a journey of profound learning and spiritual growth.</p>
    </div>

    <!-- Course Eligibility Grid -->
    <div style="background-color: #EFEEF0; padding: 80px 5%;">
        <h2 style="text-align: center; color: #004D40; font-size: 2.2rem; font-weight: 800; margin-bottom: 50px;" data-en="Course Eligibility Requirements" data-ur="کورس کی اہلیت کے تقاضے">Course Eligibility Requirements</h2>
        
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 1200px; margin: 0 auto;">
            <!-- Nazra -->
            <div style="background: #FFFFFF; padding: 12px; border-radius: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                <div style="background: #F8F9FA; border-radius: 20px; padding: 32px 24px; height: 100%;">
                    <h3 style="color: #1E293B; font-size: 1.4rem; font-weight: 700; margin-bottom: 16px;" data-en="Nazra Quran" data-ur="ناظرہ قرآن">Nazra Quran</h3>
                    <ul style="list-style: none; padding: 0; color: #475569; font-size: 0.95rem;">
                        <li style="margin-bottom: 12px; display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Age: 5 to 10 years" data-ur="عمر: ۵ سے ۱۰ سال">Age: 5 to 10 years</span>
                        </li>
                        <li style="margin-bottom: 12px; display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="No prior knowledge required" data-ur="سابقہ علم کی ضرورت نہیں">No prior knowledge required</span>
                        </li>
                        <li style="display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Required: B-Form / Birth Certificate" data-ur="ضروری دستاویز: ب فارم">Required: B-Form / Birth Certificate</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Hifz -->
            <div style="background: #FFFFFF; padding: 12px; border-radius: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                <div style="background: #F8F9FA; border-radius: 20px; padding: 32px 24px; height: 100%;">
                    <h3 style="color: #1E293B; font-size: 1.4rem; font-weight: 700; margin-bottom: 16px;" data-en="Hifz-ul-Quran" data-ur="حفظِ قرآن">Hifz-ul-Quran</h3>
                    <ul style="list-style: none; padding: 0; color: #475569; font-size: 0.95rem;">
                        <li style="margin-bottom: 12px; display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Age: 8 to 14 years" data-ur="عمر: ۸ سے ۱۴ سال">Age: 8 to 14 years</span>
                        </li>
                        <li style="margin-bottom: 12px; display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Must read Nazra fluently" data-ur="ناظرہ روانی سے پڑھنا ضروری ہے">Must read Nazra fluently</span>
                        </li>
                        <li style="display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Required: B-Form & Father's CNIC" data-ur="ضروری دستاویزات: ب فارم اور والد کا شناختی کارڈ">Required: B-Form & Father's CNIC</span>
                        </li>
                    </ul>
                </div>
            </div>

            <!-- Tajweed -->
            <div style="background: #FFFFFF; padding: 12px; border-radius: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                <div style="background: #F8F9FA; border-radius: 20px; padding: 32px 24px; height: 100%;">
                    <h3 style="color: #1E293B; font-size: 1.4rem; font-weight: 700; margin-bottom: 16px;" data-en="Tajweed Course" data-ur="تجوید کورس">Tajweed Course</h3>
                    <ul style="list-style: none; padding: 0; color: #475569; font-size: 0.95rem;">
                        <li style="margin-bottom: 12px; display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Age: 12+ years" data-ur="عمر: ۱۲ سال سے زائد">Age: 12+ years</span>
                        </li>
                        <li style="margin-bottom: 12px; display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Basic Quranic recitation skills" data-ur="بنیادی تلاوت کی مہارت">Basic Quranic recitation skills</span>
                        </li>
                        <li style="display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Required: CNIC / B-Form" data-ur="ضروری دستاویز: شناختی کارڈ یا ب فارم">Required: CNIC / B-Form</span>
                        </li>
                    </ul>
                </div>
            </div>
            
            <!-- Islamic Studies -->
            <div style="background: #FFFFFF; padding: 12px; border-radius: 32px; box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
                <div style="background: #F8F9FA; border-radius: 20px; padding: 32px 24px; height: 100%;">
                    <h3 style="color: #1E293B; font-size: 1.4rem; font-weight: 700; margin-bottom: 16px;" data-en="Islamic Studies" data-ur="اسلامیات">Islamic Studies</h3>
                    <ul style="list-style: none; padding: 0; color: #475569; font-size: 0.95rem;">
                        <li style="margin-bottom: 12px; display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Age: 15+ years" data-ur="عمر: ۱۵ سال سے زائد">Age: 15+ years</span>
                        </li>
                        <li style="margin-bottom: 12px; display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Matriculation or equivalent" data-ur="میٹرک یا مساوی تعلیم">Matriculation or equivalent</span>
                        </li>
                        <li style="display: flex; gap: 10px;">
                            <span style="color: #006754;">✔</span> <span data-en="Required: CNIC & Academic Docs" data-ur="ضروری دستاویزات: شناختی کارڈ اور تعلیمی اسناد">Required: CNIC & Academic Docs</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

    <!-- Fee Structure -->
    <div style="background-color: #FFFFFF; padding: 80px 5%;">
        <h2 style="text-align: center; color: #004D40; font-size: 2.2rem; font-weight: 800; margin-bottom: 50px;" data-en="Fee Structure" data-ur="فیس کی تفصیلات">Fee Structure</h2>
        <div style="max-width: 800px; margin: 0 auto; background: #F8F9FA; border-radius: 20px; padding: 32px; border: 1px solid #E2E8F0;">
            <table style="width: 100%; border-collapse: collapse; text-align: left;">
                <thead>
                    <tr style="border-bottom: 2px solid #006754;">
                        <th style="padding: 16px; color: #004D40;" data-en="Program" data-ur="پروگرام">Program</th>
                        <th style="padding: 16px; color: #004D40;" data-en="Admission Fee" data-ur="داخلہ فیس">Admission Fee</th>
                        <th style="padding: 16px; color: #004D40;" data-en="Monthly Tuition" data-ur="ماہانہ فیس">Monthly Tuition</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style="border-bottom: 1px solid #E2E8F0;">
                        <td style="padding: 16px;">Nazra Quran</td>
                        <td style="padding: 16px;">PKR 2,000</td>
                        <td style="padding: 16px;">PKR 1,500</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #E2E8F0;">
                        <td style="padding: 16px;">Hifz-ul-Quran</td>
                        <td style="padding: 16px;">PKR 3,000</td>
                        <td style="padding: 16px;">PKR 2,500</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #E2E8F0;">
                        <td style="padding: 16px;">Tajweed Course</td>
                        <td style="padding: 16px;">PKR 2,500</td>
                        <td style="padding: 16px;">PKR 2,000</td>
                    </tr>
                    <tr>
                        <td style="padding: 16px;">Islamic Studies</td>
                        <td style="padding: 16px;">PKR 5,000</td>
                        <td style="padding: 16px;">PKR 3,500</td>
                    </tr>
                </tbody>
            </table>
            <div style="margin-top: 24px; padding: 16px; background-color: #E8F5E9; border-left: 4px solid #006754; border-radius: 4px;">
                <p style="color: #004D40; font-size: 0.95rem; margin: 0;" data-en="<strong>Financial Assistance:</strong> Deserving students can apply for Zakat/Scholarships to cover their educational and hostel expenses. No student is turned away due to financial constraints." data-ur="<strong>مالی معاونت:</strong> مستحق طلباء اپنے تعلیمی اور ہاسٹل کے اخراجات پورے کرنے کے لیے زکوٰۃ یا وظائف کے لیے درخواست دے سکتے ہیں۔ مالی مجبوریوں کی وجہ سے کسی طالب علم کو واپس نہیں کیا جاتا۔"><strong>Financial Assistance:</strong> Deserving students can apply for Zakat/Scholarships to cover their educational and hostel expenses. No student is turned away due to financial constraints.</p>
            </div>
        </div>
    </div>

    <!-- Application Form -->
    <div style="background-color: #EFEEF0; padding: 80px 5%;">
        <div style="max-width: 800px; margin: 0 auto; background: #FFFFFF; padding: 12px; border-radius: 32px; box-shadow: 0 10px 40px rgba(0,0,0,0.08);">
            <div style="background: #F8F9FA; border-radius: 20px; padding: 40px;">
                <h2 style="text-align: center; color: #004D40; font-size: 2.2rem; font-weight: 800; margin-bottom: 30px;" data-en="Online Application Form" data-ur="آن لائن داخلہ فارم">Online Application Form</h2>
                
                <form action="#" method="POST" style="display: flex; flex-direction: column; gap: 20px;">
                    <!-- Student Details -->
                    <h4 style="color: #025F55; font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; border-bottom: 1px solid #CBD5E1; padding-bottom: 5px;" data-en="Student Details" data-ur="طالب علم کی تفصیلات">Student Details</h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="display: block; font-size: 0.9rem; color: #475569; margin-bottom: 6px; font-weight: 600;" data-en="Full Name *" data-ur="پورا نام *">Full Name *</label>
                            <input type="text" required style="width: 100%; padding: 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-family: inherit; font-size: 1rem;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.9rem; color: #475569; margin-bottom: 6px; font-weight: 600;" data-en="Date of Birth *" data-ur="تاریخ پیدائش *">Date of Birth *</label>
                            <input type="date" required style="width: 100%; padding: 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-family: inherit; font-size: 1rem;">
                        </div>
                    </div>
                    
                    <div>
                        <label style="display: block; font-size: 0.9rem; color: #475569; margin-bottom: 6px; font-weight: 600;" data-en="B-Form / CNIC Number *" data-ur="ب فارم / شناختی کارڈ نمبر *">B-Form / CNIC Number *</label>
                        <input type="text" required placeholder="XXXXX-XXXXXXX-X" style="width: 100%; padding: 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-family: inherit; font-size: 1rem;">
                    </div>

                    <!-- Guardian Details -->
                    <h4 style="color: #025F55; font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; margin-top: 20px; border-bottom: 1px solid #CBD5E1; padding-bottom: 5px;" data-en="Guardian Details" data-ur="سرپرست کی تفصیلات">Guardian Details</h4>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
                        <div>
                            <label style="display: block; font-size: 0.9rem; color: #475569; margin-bottom: 6px; font-weight: 600;" data-en="Father/Guardian Name *" data-ur="والد/سرپرست کا نام *">Father/Guardian Name *</label>
                            <input type="text" required style="width: 100%; padding: 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-family: inherit; font-size: 1rem;">
                        </div>
                        <div>
                            <label style="display: block; font-size: 0.9rem; color: #475569; margin-bottom: 6px; font-weight: 600;" data-en="Contact Number *" data-ur="رابطہ نمبر *">Contact Number *</label>
                            <input type="tel" required placeholder="03XX-XXXXXXX" style="width: 100%; padding: 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-family: inherit; font-size: 1rem;">
                        </div>
                    </div>

                    <!-- Course & Documents -->
                    <h4 style="color: #025F55; font-size: 1.2rem; font-weight: 700; margin-bottom: 10px; margin-top: 20px; border-bottom: 1px solid #CBD5E1; padding-bottom: 5px;" data-en="Course Selection & Documents" data-ur="کورس کا انتخاب اور دستاویزات">Course Selection & Documents</h4>
                    
                    <div>
                        <label style="display: block; font-size: 0.9rem; color: #475569; margin-bottom: 6px; font-weight: 600;" data-en="Select Course *" data-ur="کورس کا انتخاب کریں *">Select Course *</label>
                        <select required style="width: 100%; padding: 12px; border: 1px solid #CBD5E1; border-radius: 8px; font-family: inherit; font-size: 1rem; background-color: #FFFFFF;">
                            <option value="">-- Select a Course --</option>
                            <option value="nazra">Nazra Quran</option>
                            <option value="hifz">Hifz-ul-Quran</option>
                            <option value="tajweed">Tajweed Course</option>
                            <option value="islamic">Islamic Studies</option>
                        </select>
                    </div>

                    <div>
                        <label style="display: block; font-size: 0.9rem; color: #475569; margin-bottom: 6px; font-weight: 600;" data-en="Upload B-Form / CNIC Photo" data-ur="ب فارم / شناختی کارڈ کی تصویر اپ لوڈ کریں">Upload B-Form / CNIC Photo</label>
                        <input type="file" accept="image/*,.pdf" style="width: 100%; padding: 10px; border: 1px dashed #006754; border-radius: 8px; background: rgba(0, 103, 84, 0.05); font-family: inherit;">
                    </div>

                    <div style="margin-top: 20px; text-align: center;">
                        <button type="submit" class="btn-primary-invert" style="width: 100%; justify-content: center; cursor: pointer; padding: 12px; font-size: 1.1rem;">
                            <span class="btn-text" data-en="Submit Application" data-ur="درخواست جمع کرائیں">Submit Application</span>
                            <span class="arrow-circle">
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <!-- FAQ Section -->
    <div style="background-color: #FFFFFF; padding: 80px 5%;">
        <div style="max-width: 800px; margin: 0 auto;">
            <h2 style="text-align: center; color: #004D40; font-size: 2.2rem; font-weight: 800; margin-bottom: 50px;" data-en="Frequently Asked Questions" data-ur="اکثر پوچھے گئے سوالات">Frequently Asked Questions</h2>
            
            <div style="display: flex; flex-direction: column; gap: 16px;">
                <details style="background: #F8F9FA; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; cursor: pointer;">
                    <summary style="font-size: 1.1rem; font-weight: 700; color: #1E293B; outline: none;" data-en="Are hostel facilities available for out-of-city students?" data-ur="کیا شہر سے باہر کے طلباء کے لیے ہاسٹل کی سہولت موجود ہے؟">Are hostel facilities available for out-of-city students?</summary>
                    <p style="margin-top: 12px; color: #475569; line-height: 1.6;" data-en="Yes, we provide comfortable hostel facilities with meals for out-of-city students at nominal charges." data-ur="جی ہاں، ہم شہر سے باہر کے طلباء کے لیے معمولی فیس پر کھانے کے ساتھ آرام دہ ہاسٹل کی سہولیات فراہم کرتے ہیں۔">Yes, we provide comfortable hostel facilities with meals for out-of-city students at nominal charges.</p>
                </details>
                
                <details style="background: #F8F9FA; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; cursor: pointer;">
                    <summary style="font-size: 1.1rem; font-weight: 700; color: #1E293B; outline: none;" data-en="Can I take classes online?" data-ur="کیا میں آن لائن کلاسز لے سکتا ہوں؟">Can I take classes online?</summary>
                    <p style="margin-top: 12px; color: #475569; line-height: 1.6;" data-en="Absolutely. We offer dedicated online classes for Nazra, Hifz, and Tajweed for international and distant students." data-ur="بالکل۔ ہم بین الاقوامی اور دور دراز کے طلباء کے لیے ناظرہ، حفظ اور تجوید کی خصوصی آن لائن کلاسز پیش کرتے ہیں۔">Absolutely. We offer dedicated online classes for Nazra, Hifz, and Tajweed for international and distant students.</p>
                </details>
                
                <details style="background: #F8F9FA; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px; cursor: pointer;">
                    <summary style="font-size: 1.1rem; font-weight: 700; color: #1E293B; outline: none;" data-en="What is the syllabus for the admission test?" data-ur="داخلہ ٹیسٹ کا نصاب کیا ہے؟">What is the syllabus for the admission test?</summary>
                    <p style="margin-top: 12px; color: #475569; line-height: 1.6;" data-en="The test varies by course. For Hifz, students are tested on their Nazra fluency. For Islamic Studies, a basic general knowledge and aptitude test is conducted." data-ur="ٹیسٹ کورس کے لحاظ سے مختلف ہوتا ہے۔ حفظ کے لیے ناظرہ کی روانی کا ٹیسٹ لیا جاتا ہے۔ اسلامیات کے لیے بنیادی عمومی معلومات اور رجحان کا ٹیسٹ ہوتا ہے۔">The test varies by course. For Hifz, students are tested on their Nazra fluency. For Islamic Studies, a basic general knowledge and aptitude test is conducted.</p>
                </details>
            </div>
        </div>
    </div>
    
    <!-- Helpdesk Widget -->
    <a href="https://wa.me/923000000000" target="_blank" style="position: fixed; bottom: 30px; right: 30px; background-color: #25D366; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4); z-index: 1000; text-decoration: none; transition: transform 0.3s ease;" class="helpdesk-widget">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133-.298-.347-.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
    </a>
    <style>
        .helpdesk-widget:hover {
            transform: scale(1.1) !important;
        }
    </style>
</main>'''
    
    new_content = content[:main_start] + new_main + content[main_end+7:]
    
    with open('admissions.html', 'w', encoding='utf-8') as f:
        f.write(new_content)
    print("Successfully replaced main content.")
else:
    print("Could not find <main> tags.")
