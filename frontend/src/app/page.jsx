import Link from "next/link";
import Navbar from "../components/Navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO SECTION */}
      <section className="hero">
        <div className="container">
          <span className="badge">
            🚀 AI-Powered Academic Library Platform
          </span>

          <h1>
            Smart Digital Library with Resource Recommendation Engine
          </h1>

          <p className="hero-text">
            Welcome to the next generation of academic resource
            management. The Smart Digital Library is designed to
            transform the way students, researchers, lecturers,
            and librarians access and utilize educational
            materials. By combining digital library technology
            with intelligent recommendation algorithms, the
            platform provides users with personalized academic
            resources that support learning, research, and
            innovation.
          </p>

          <p className="muted">
            Case Study: Kashim Ibrahim Library,
            Ahmadu Bello University, Zaria.
          </p>

          <div className="row">
            <Link href="/resources">
              <button>
                Browse Resources
              </button>
            </Link>

            <Link href="/register">
              <button className="btn-light">
                Create Account
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="container">
        <div className="section-header">
          <h2>Why Choose Smart Digital Library?</h2>
          <p>
            A comprehensive platform designed to improve access,
            organization, and discovery of academic materials.
          </p>
        </div>

        <div className="grid">
          <div className="card">
            <h3>📚 Digital Resources</h3>
            <p>
              Access a wide collection of academic materials
              including books, journals, lecture notes,
              conference papers, past projects, theses,
              dissertations, and past examination questions
              from a centralized repository.
            </p>
          </div>

          <div className="card">
            <h3>🤖 Smart Recommendations</h3>
            <p>
              The recommendation engine analyzes user interests,
              department, course of study, search history,
              downloads, and resource categories to provide
              personalized academic suggestions.
            </p>
          </div>

          <div className="card">
            <h3>🔍 Advanced Search</h3>
            <p>
              Search resources by title, author, keyword,
              department, category, course code, or publication
              year to quickly locate relevant materials.
            </p>
          </div>

          <div className="card">
            <h3>📈 Learning Analytics</h3>
            <p>
              Monitor resource usage, downloads, searches, and
              user engagement through powerful analytics and
              reporting tools for librarians and administrators.
            </p>
          </div>

          <div className="card">
            <h3>☁️ Secure Digital Storage</h3>
            <p>
              Store and manage academic resources securely in
              the cloud while ensuring easy accessibility for
              authorized users across different devices.
            </p>
          </div>

          <div className="card">
            <h3>👨‍🎓 Student-Centered Experience</h3>
            <p>
              Designed specifically to support student learning
              by providing easy access to high-quality academic
              resources and intelligent content discovery.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="container">
        <div className="section-header">
          <h2>How It Works</h2>
          <p>
            Discover academic resources in three simple steps.
          </p>
        </div>

        <div className="grid">
          <div className="card">
            <h3>1️⃣ Create an Account</h3>
            <p>
              Register as a student, researcher, lecturer, or
              librarian to gain access to the digital library
              services.
            </p>
          </div>

          <div className="card">
            <h3>2️⃣ Search Resources</h3>
            <p>
              Browse thousands of academic materials using
              powerful search and filtering tools.
            </p>
          </div>

          <div className="card">
            <h3>3️⃣ Receive Recommendations</h3>
            <p>
              Get personalized suggestions based on your
              academic interests and usage behavior.
            </p>
          </div>
        </div>
      </section>

      {/* STATISTICS SECTION */}
      <section className="container">
        <div className="section-header">
          <h2>Platform Highlights</h2>
        </div>

        <div className="grid">
          <div className="card">
            <h1>1000+</h1>
            <p>Academic Resources</p>
          </div>

          <div className="card">
            <h1>500+</h1>
            <p>Active Students</p>
          </div>

          <div className="card">
            <h1>50+</h1>
            <p>Departments Supported</p>
          </div>

          <div className="card">
            <h1>24/7</h1>
            <p>Resource Accessibility</p>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="container">
        <div className="card">
          <h2>Start Your Academic Journey Today</h2>

          <p>
            Explore thousands of academic resources, receive
            intelligent recommendations, and enhance your
            learning experience through a modern digital
            library platform.
          </p>

          <div className="row">
            <Link href="/register">
              <button>
                Get Started
              </button>
            </Link>

            <Link href="/resources">
              <button className="btn-light">
                Explore Resources
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}