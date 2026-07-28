# Images

Photos of you go here. Project thumbnails go in `projects/`.

## Adding your photos

1. Drop the file in this folder. Any name works, but the config comments
   assume `dan-hero.jpg`, `dan-about.jpg`, and `dan-contact.jpg`.
2. Uncomment the matching lines:

| Where it shows | File to edit | What to uncomment |
| :--- | :--- | :--- |
| Homepage, beside the headline | `_config.yml` | `photo:` under `author:` |
| About page, beside the bio | `about.md` | `photo:` in the front matter |
| Contact page | `contact.md` | `photo:` in the front matter |

Nothing renders and no empty space is reserved until you set these, so the
pages look finished either way.

## What works best

- **Shape:** these slots crop to 4:5 portrait. A vertical or square photo
  survives the crop better than a wide one.
- **Size:** around 800px wide is plenty. Anything over ~400KB is worth
  compressing, since large images slow the page down for everyone.
- **Format:** JPG for photos, PNG only if you need transparency.

## More photos anywhere else

Standard markdown works in any page or project body and is already styled with
rounded corners:

```markdown
![Short description of the photo](/assets/images/your-photo.jpg)
```

Always write real alt text. It is what a screen reader reads aloud and what
shows if the image fails to load.
