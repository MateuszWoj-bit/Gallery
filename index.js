const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static('public'))

app.get('/api/images', (req, res) => {
  const imagesDir = path.join(__dirname, 'images')

  fs.readdir(imagesDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Unable to scan directory' })
    }

    const images = files.filter(
      (file) =>
        file.endsWith('.jpg') ||
        file.endsWith('.jpeg') ||
        file.endsWith('.png') ||
        file.endsWith('.gif')
    )

    images.sort((a, b) => {
      const isSimple = (str) => /^[a-zA-Z]*\d+[a-zA-Z]*\.\w+$/.test(str);
    
      const aIsSimple = isSimple(a);
      const bIsSimple = isSimple(b);
    
      if (aIsSimple && !bIsSimple) return -1;
      if (!aIsSimple && bIsSimple) return 1;
    
      const numA = a.match(/\d+/g)?.map(Number) || [];
      const numB = b.match(/\d+/g)?.map(Number) || [];
    
      for (let i = 0; i < Math.max(numA.length, numB.length); i++) {
        const diff = (numA[i] || 0) - (numB[i] || 0);
        if (diff !== 0) return diff;
      }
    
      return a.localeCompare(b);
    });

    console.table(images)

    const jsonData = { images }

    fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: 'Unable to write JSON file' })
      }

      console.log('Image data saved to data.json')
    })

    res.json(jsonData)
  })
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
  console.log(`Server running at http://localhost:${port}/api/images`)
})
