import { useState } from "react"; // Mengimpor hook useState dari React untuk mengelola state dalam komponen.

const content = [
	{
		title: "Pendidikan Berkualitas", // Judul dari tab pertama.
		body: "Mendapatkan pendidikan yang baik dan relevan dengan minat dan tujuan karir Anda adalah langkah pertama menuju sukses. Ini membantu membangun fondasi pengetahuan dan keterampilan yang diperlukan.", // Isi dari tab pertama.
	},
	{
		title: "Kerja Keras dan Konsistensi", // Judul dari tab kedua.
		body: "Kerja keras, dedikasi, dan konsistensi adalah kunci untuk mencapai tujuan. Tetap fokus pada upaya Anda, terus belajar, dan tidak mudah menyerah adalah bagian penting dari perjalanan menuju sukses.", // Isi dari tab kedua.
	},
	{
		title: "Networking dan Kolaborasi", // Judul dari tab ketiga.
		body: "Membangun hubungan dengan orang lain di bidang Anda, belajar dari mereka, dan bekerja sama dalam proyek-proyek yang relevan dapat membuka pintu untuk peluang baru dan memperluas jaringan profesional Anda.", // Isi dari tab ketiga.
	},
];

export default function App() {
	// Komponen utama yang akan diekspor sebagai default.
	return (
		// Menampilkan komponen Tabbed dengan konten dari variabel content.
		<div>
			<Tabbed content={content} /> 
		</div>
	);
}

function Tabbed({ content }) {
	// Komponen yang mengelola tab dan kontennya.
	const [activeTab, setActiveTab] = useState(0); // State untuk melacak tab mana yang sedang aktif.

	return (
		<div>
			<div className="tabs">
				{/* Menampilkan tombol-tombol untuk berpindah antar tab. */}
				<Tab
					num={0}
					activeTab={activeTab}
					onClick={setActiveTab}
				/>
				<Tab
					num={1}
					activeTab={activeTab}
					onClick={setActiveTab}
				/>
				<Tab
					num={2}
					activeTab={activeTab}
					onClick={setActiveTab}
				/>
				<Tab
					num={3}
					activeTab={activeTab}
					onClick={setActiveTab}
				/>
			</div>

			{/* Menampilkan konten berdasarkan tab yang aktif */}
			{activeTab <= 2 ? (
				<TabContent item={content.at(activeTab)} /> // Jika tab aktif adalah salah satu dari 0-2, tampilkan konten tab terkait.
			) : (
				<AnotherTabContent /> // Jika tab aktif adalah tab ke-3, tampilkan konten yang berbeda.
			)}
		</div>
	);
}

function Tab({ num, activeTab, onClick }) {
	// Komponen untuk satu tombol tab.
	return (
		// Menampilkan nomor tab.
		<button
			className={activeTab === num ? "tab active" : "tab"} // Jika tab ini aktif, tambahkan kelas "active".
			onClick={() => onClick(num)} // Ubah tab aktif saat tombol ini diklik.
			>
			Tab {num + 1} 
		</button>
	);
}

function TabContent({ item }) {
	// Komponen untuk menampilkan konten tab.
	const [showDetails, setShowDetails] = useState(true); // State untuk menampilkan atau menyembunyikan detail.
	const [likes, setLikes] = useState(0); // State untuk melacak jumlah likes.

	console.log("RENDER"); // Konsol untuk melacak render ulang komponen.

	function handleInc() {
		setLikes((likes) => likes + 1); // Tambah jumlah likes satu per satu.
	}

	function handleLikes() {
		// Contoh bagaimana state di-update tiga kali secara berturut-turut.
		handleInc();
		handleInc();
		handleInc();
	}

	function handleUndo() {
		setShowDetails(true); // Kembalikan tampilan detail.
		setLikes(0); // Reset jumlah likes ke 0.
		console.log(showDetails); // Konsol untuk melacak perubahan state showDetails.
		console.log(likes); // Konsol untuk melacak perubahan state likes.
	}

	function handleUndoLater() {
		setTimeout(handleUndo, 2000); // Mengatur ulang state setelah 2 detik.
	}

	return (
		<div className="tab-content">
			{/* // Menampilkan judul tab. */}
			<h4>{item.title}</h4> 
			{/* // Menampilkan isi tab jika showDetails true. */}
			{showDetails && <p>{item.body}</p>} 
			<div className="tab-actions">
				<button onClick={() => setShowDetails((h) => !h)}>
					{/* Isi // Tombol untuk menampilkan atau menyembunyikan isi. */}
					{showDetails ? "Sembunyikan" : "Tampilkan"} 
				</button>

				<div className="hearts-counter">
					{/* // Menampilkan jumlah likes. */}
					<span>{likes} 👍</span> 
					{/* // Tombol untuk menambah satu like. */}
					<button onClick={handleInc}>+1</button> 
					{/* // Tombol untuk menambah tiga likes. */}
					<button onClick={handleLikes}>+3</button> 
				</div>
			</div>
			<div className="tab-undo">
				{/* // Tombol untuk mengatur ulang state. */}
				<button onClick={handleUndo}>Batal</button>
				{/* // Tombol untuk mengatur ulang state setelah 2 detik. */}
				<button onClick={handleUndoLater}>Batal dalam 2d</button> 
			</div>
		</div>
	);
}

function AnotherTabContent() {
	return (
		<div className="tab-content">
			<h4>
				Saya adalah tab yg berbeda, jadi data pada State akan hilang 💣
				{/* // Peringatan bahwa data akan hilang jika berpindah tab. */}
			</h4>
			<p>
				Pada saat kamu kembali ke tab yang memiliki data, maka akan
				hilang dan mulai dari awal.
			</p>
		</div>
	);
}
