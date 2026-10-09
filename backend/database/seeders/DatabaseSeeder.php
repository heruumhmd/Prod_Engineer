<?php

namespace Database\Seeders;

use App\Enums\EmploymentType;
use App\Enums\MinExperience;
use App\Models\Company;
use App\Models\Vacancy;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1 Perusahaan seed (sesuai Figma Frame 1 & 4)
        $company = Company::create([
            'name' => 'Dicoding Indonesia',
            'business_sector' => 'Technology',
            'size_range' => '50-100',
            'logo_path' => null,
        ]);

        $productEngineerDescription = <<<'HTML'
<h3>Job Description</h3>
<p>As a Product Engineer, you will be joining the Product &amp; Engineering team in building impactful products for Dicoding users. With your programming skills, you will be responsible for creating great experiences for our users.</p>
<p>We are looking for an engineer, who not only knows how to program with good functionality, but also solves user problems. When building <a href="https://dicoding.com" target="_blank" rel="noopener noreferrer">dicoding.com</a>, we always try to:</p>
<ul>
    <li>Give maximum impact from the solutions we built.</li>
    <li>Live a balanced life (it is important for engineers to sleep well).</li>
</ul>

<h3>Responsibilities</h3>
<ul>
    <li>Collaborate with designers and other stakeholders in analyzing problems and solutions to be built.</li>
    <li>Develop and manage the <a href="https://dicoding.com" target="_blank" rel="noopener noreferrer">dicoding.com</a> platform.</li>
    <li>Ensure all systems and components on <a href="https://dicoding.com" target="_blank" rel="noopener noreferrer">dicoding.com</a> run properly.</li>
    <li>Write well-designed, easy-to-test, efficient, and clean code on both the front-end and back-end.</li>
</ul>

<h3>Requirements</h3>
<p>When it comes to requirements, at Dicoding, we have no limitations on specific tools or technologies. We are open to any technology and tools that can meet the business needs and provide the best solutions for our users. With that in mind, here are the general requirements for a Product Engineer at Dicoding:</p>
<ul>
    <li>Proficiency in Git and Unix-based systems.</li>
    <li>Good knowledge of web technologies.</li>
    <li>Want to follow and learn the development culture in Dicoding: Test Driven Development.</li>
    <li>Able to understand the requirements of a solution that will be built properly.</li>
    <li>Having a growth mindset and high curiosity.</li>
</ul>
HTML;

        $androidDescription = <<<'HTML'
<h3>Job Description</h3>
<p>Sebagai Android Developer di Dicoding, Anda akan bertanggung jawab mengembangkan dan memelihara aplikasi Android native berkualitas tinggi untuk para pengguna dan pelajar Dicoding.</p>
<h3>Responsibilities</h3>
<ul>
    <li>Membangun fitur-fitur baru pada aplikasi Android Dicoding dengan Kotlin modern.</li>
    <li>Bekerja sama dengan tim UI/UX dan backend engineer.</li>
</ul>
<h3>Requirements</h3>
<ul>
    <li>Berpengalaman 4-5 tahun dalam Android Native (Kotlin/Java).</li>
    <li>Memahami arsitektur MVVM, Coroutines, dan Jetpack Compose.</li>
</ul>
HTML;

        $iosDescription = <<<'HTML'
<h3>Job Description</h3>
<p>Sebagai iOS Developer, Anda akan bergabung dengan tim mobile untuk menciptakan pengalaman pengguna aplikasi iOS yang mulus, cepat, dan intuitif.</p>
<h3>Responsibilities</h3>
<ul>
    <li>Mengembangkan modul dan fitur baru pada aplikasi iOS Dicoding menggunakan Swift.</li>
    <li>Menjaga kualitas kode melalui unit test dan code review.</li>
</ul>
<h3>Requirements</h3>
<ul>
    <li>Pengalaman 1-3 tahun dalam pengembangan iOS (Swift, SwiftUI/UIKit).</li>
    <li>Memahami RESTful API integration dan Git.</li>
</ul>
HTML;

        $codeReviewerDescription = <<<'HTML'
<h3>Job Description</h3>
<p>Sebagai Code Reviewer di Dicoding, Anda akan membantu siswa kelas pemrograman Dicoding Academy dengan mengulas submission proyek kode mereka dan memberikan umpan balik konstruktif.</p>
<h3>Responsibilities</h3>
<ul>
    <li>Memeriksa submission proyek siswa sesuai dengan rubrik penilaian yang ditentukan.</li>
    <li>Memberikan saran perbaikan dan apresiasi kode yang baik secara profesional.</li>
</ul>
<h3>Requirements</h3>
<ul>
    <li>Memahami dasar pemrograman web atau mobile dengan baik.</li>
    <li>Memiliki kemampuan komunikasi tertulis yang empati dan jelas.</li>
</ul>
HTML;

        // 4 Vacancy deterministik persis seperti Frame 1 Figma
        // ID 1: Product Engineer
        Vacancy::create([
            'company_id' => $company->id,
            'title' => 'Product Engineer',
            'position' => 'Product Engineer', // Dummy position (tidak ada field position di Frame 1/4)
            'employment_type' => EmploymentType::FULL_TIME,
            'candidates_needed' => 1,
            'active_until' => '2023-12-30',
            'location' => 'Bandung',
            'is_remote' => false,
            'description' => $productEngineerDescription,
            'salary_min' => 10000000, // Dummy salary (tidak tampil di Frame 1-4)
            'salary_max' => 15000000,
            'show_salary' => false,
            'min_experience' => MinExperience::EXP_1_3,
            'created_at' => Carbon::parse('2023-12-15 12:00:00'),
            'updated_at' => Carbon::parse('2023-12-15 12:00:00'),
        ]);

        // ID 2: Android Developer
        Vacancy::create([
            'company_id' => $company->id,
            'title' => 'Android Developer',
            'position' => 'Android Developer',
            'employment_type' => EmploymentType::FULL_TIME,
            'candidates_needed' => 2,
            'active_until' => '2023-12-30',
            'location' => 'Bandung',
            'is_remote' => false,
            'description' => $androidDescription,
            'salary_min' => 9000000,
            'salary_max' => 14000000,
            'show_salary' => false,
            'min_experience' => MinExperience::EXP_4_5,
            'created_at' => Carbon::parse('2023-12-15 11:00:00'),
            'updated_at' => Carbon::parse('2023-12-15 11:00:00'),
        ]);

        // ID 3: iOS Developer
        Vacancy::create([
            'company_id' => $company->id,
            'title' => 'iOS Developer',
            'position' => 'iOS Developer',
            'employment_type' => EmploymentType::FULL_TIME,
            'candidates_needed' => 1,
            'active_until' => '2023-12-30',
            'location' => 'Bandung',
            'is_remote' => false,
            'description' => $iosDescription,
            'salary_min' => 9000000,
            'salary_max' => 13000000,
            'show_salary' => false,
            'min_experience' => MinExperience::EXP_1_3,
            'created_at' => Carbon::parse('2023-12-15 10:00:00'),
            'updated_at' => Carbon::parse('2023-12-15 10:00:00'),
        ]);

        // ID 4: Code Reviewer
        Vacancy::create([
            'company_id' => $company->id,
            'title' => 'Code Reviewer',
            'position' => 'Code Reviewer',
            'employment_type' => EmploymentType::FULL_TIME,
            'candidates_needed' => 3,
            'active_until' => '2023-12-30',
            'location' => 'Bandung',
            'is_remote' => false,
            'description' => $codeReviewerDescription,
            'salary_min' => 5000000,
            'salary_max' => 8000000,
            'show_salary' => false,
            'min_experience' => MinExperience::LT_1,
            'created_at' => Carbon::parse('2023-12-15 09:00:00'),
            'updated_at' => Carbon::parse('2023-12-15 09:00:00'),
        ]);
    }
}
