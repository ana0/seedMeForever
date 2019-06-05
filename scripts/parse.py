import re

def parse(filename, delimiter):
    text = open(filename, "r")
    text = text.read()
    text = re.split(delimiter, text)
    return text

def write(endangered, sounds):
	file = open('subset.txt', "w+")
	for bird in endangered:
		if bird in sounds:
			file.write(bird + "\n")
	file.close()

sounds = parse("birds.txt", " \t|\n")
endangered = parse('taxonomy.csv', ",")
write(endangered, sounds)
