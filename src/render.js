var fileInput = document.getElementById("student"),
fileInput = document.getElementById("advisor"),
    readFile = function () {
        var reader = new FileReader();
        reader.onload = function () {
            document.getElementById('out').innerHTML = reader.result;
        };
        
        reader.readAsBinaryString(fileInput.files[0]);
    };

fileInput.addEventListener('change', readFile);
