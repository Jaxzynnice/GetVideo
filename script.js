document.getElementById('downloadForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const videoUrl = document.getElementById('videoUrl').value;

    // Tampilkan loading state
    document.getElementById('result').innerHTML = '<p class="text-center">Loading...</p>';

    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: videoUrl }),
        });
        const data = await response.json();

        const resultHtml = `
            <div class="space-y-4">
                <h2 class="text-xl font-bold">${data.title}</h2>
                <p class="text-gray-600">Owner: ${data.owner}</p>
                <img src="${data.thumb}" alt="Thumbnail" class="rounded-lg">
                <video controls class="w-full rounded-lg">
                    <source src="${data.video}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <div class="flex gap-4">
                    <a href="${data.thumb}" download="thumbnail.jpg" class="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600">Download Thumbnail</a>
                    <a href="${data.video}" download="video.mp4" class="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600">Download Video</a>
                    ${data.audio ? `<a href="${data.audio}" download="audio.mp3" class="bg-purple-500 text-white p-2 rounded-lg hover:bg-purple-600">Download Audio</a>` : ''}
                </div>
            </div>
        `;
        document.getElementById('result').innerHTML = resultHtml;
    } catch (error) {
        document.getElementById('result').innerHTML = `<p class="text-red-500">Error: ${error.message}</p>`;
    }
});
