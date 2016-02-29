#Templates
Here you will find templates for building components for various technologies. 
Each folder will have examples of what the built templates will look like as 
well as folder for all the supported IDE template types.

##Intellij Idea Templates
1. To create a new template, select File | Settings | File and Code Templates... in Intellij Idea
2. Click the "Create New (insert)" button in the top left of the interface.
3. Create a name in the name panel and enter a file extension. 
4. Copy and paste the code from ./{tech}/intellij-idea/{template}, paste it into your newly created template and click ok.
5. When creating a new file you can now select the template in the contest menu on right click.

##Sublime Snippets
1. To create a new snippet, select Tools | New Snippet... in sublime text.
2. Copy and paste the code from ./{tech}/sublime-snippets/{template} and paste it into your newly created file.
3. Save the file in your /path/to/{sublime}/Packages/User folder.
4. Create a new file that is a supported extension for the snippet (ie "new-file.js" if <scope>source.js</scope>).
5. In your newly created file type the tabTrigger from the snippet and hit "tab" (ie type angularService if <tabTrigger>angularService</tabTrigger>).
6. If there are template variables to insert you may begin typing to begin filling them out.